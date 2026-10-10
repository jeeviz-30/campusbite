// ═══════════════════════════════════════════════════════════
//  notifications.js — Real-time Order Status Notifications
//  Uses: BroadcastChannel API (cross-tab) + Web Notifications
// ═══════════════════════════════════════════════════════════

const _BC_NAME = 'campusbite_realtime';
let   _bcListenerChannel = null;
let   _statusCache       = {};   // { orderId: lastKnownStatus }

// ── Request browser notification permission ──────────────────
function requestNotifPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(perm => {
            if (perm === 'granted') showToast('🔔 Notifications enabled! We\'ll alert you when your order is ready.');
        });
    }
}

// ── Show a native browser push notification ──────────────────
function pushNotif(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        try { new Notification(title, { body }); } catch(e) { /* iOS Safari fallback */ }
    }
}

// ── Status → human messages ───────────────────────────────────
const _STATUS_MSG = {
    PREPARING:        { emoji: '👨‍🍳', title: 'Being Prepared!',    body: 'Your food is being cooked right now.' },
    READY_FOR_PICKUP: { emoji: '✅', title: 'Ready for Pickup!',   body: 'Collect at Counter 2 with your token.' },
    COMPLETED:        { emoji: '🎉', title: 'Order Completed!',     body: 'Thanks for choosing CampusBite!' }
};

// ── Fire notification for a status change ────────────────────
function _fireNotif(order) {
    const def = _STATUS_MSG[order.status];
    if (!def) return;
    const token = String(order.orderId).slice(-4);
    const title = `${def.emoji} Token #${token} — ${def.title}`;
    pushNotif(title, def.body);

    // Also show in-app toast
    const toast = document.createElement('div');
    toast.className = 'p-4 rounded-2xl text-xs font-black text-white shadow-2xl flex items-center gap-3 pointer-events-auto bg-emerald-700 border border-emerald-500';
    toast.innerHTML = `<span class="text-xl">${def.emoji}</span><div><div class="font-extrabold text-sm">${title}</div><div class="font-medium opacity-90 mt-0.5">${def.body}</div></div>`;
    const container = document.getElementById('toastContainer');
    if (container) {
        container.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 7000);
    }
    _statusCache[order.orderId] = order.status;
}

// ── Start listening (call on student page load) ───────────────
function startOrderListener(userId) {
    if (!userId) return;

    // Seed cache with current order statuses
    const existing = JSON.parse(localStorage.getItem('canteen_orders') || '[]');
    existing.filter(o => o.userId === userId).forEach(o => { _statusCache[o.orderId] = o.status; });

    // BroadcastChannel: instant cross-tab updates
    if ('BroadcastChannel' in window) {
        _bcListenerChannel = new BroadcastChannel(_BC_NAME);
        _bcListenerChannel.onmessage = ({ data }) => {
            if (data.type === 'STATUS_UPDATE' && data.order.userId === userId) {
                _fireNotif(data.order);
                refreshMyOrders && refreshMyOrders();
            }
        };
    }

    // Polling fallback every 5 s (catches localStorage changes from same tab or manual edits)
    setInterval(() => {
        const orders = JSON.parse(localStorage.getItem('canteen_orders') || '[]');
        orders.filter(o => o.userId === userId).forEach(o => {
            if (_statusCache[o.orderId] !== undefined && _statusCache[o.orderId] !== o.status) {
                _fireNotif(o);
                refreshMyOrders && refreshMyOrders();
            }
            _statusCache[o.orderId] = o.status;
        });
    }, 5000);
}

// ── Broadcast from admin tab when advancing status ────────────
function broadcastStatusUpdate(order) {
    if ('BroadcastChannel' in window) {
        const ch = new BroadcastChannel(_BC_NAME);
        ch.postMessage({ type: 'STATUS_UPDATE', order });
        ch.close();
    }
}
