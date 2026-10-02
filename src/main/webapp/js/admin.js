document.addEventListener('DOMContentLoaded', () => {
    loadAllMenuItems();
});

// Load all items (including unavailable ones) for management
async function loadAllMenuItems() {
    try {
        const res = await fetch('/api/menu/all');
        const items = await res.json();
        const tableBody = document.getElementById('admin-menu-list');

        tableBody.innerHTML = items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>${item.isAvailable ? 'Available' : 'Out of Stock'}</td>
                <td>
                    <button class="btn" onclick="toggleAvailability(${item.itemId}, ${!item.isAvailable})">
                        ${item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (err) {
        console.error('Error loading admin menu:', err);
    }
}

// Toggle item stock availability
async function toggleAvailability(itemId, isAvailable) {
    try {
        const res = await fetch('/api/menu/availability', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId, isAvailable })
        });

        const data = await res.json();
        if (data.success) {
            loadAllMenuItems();
        }
    } catch (err) {
        console.error('Failed to update status:', err);
    }
}

// Update Order Status (e.g. mark Ready for Pickup)
async function updateOrderStatus(orderId, status) {
    try {
        const res = await fetch('/api/orders/status', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId, status })
        });

        const data = await res.json();
        alert(data.message);
    } catch (err) {
        console.error('Failed to update order status:', err);
    }
}