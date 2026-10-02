# Contributing to Canteen Pre-Order System (CampusBite)

First off, thank you for considering contributing to the Canteen Pre-Order System! Follow these guidelines to ensure a smooth collaboration.

---

## Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone. Please treat all contributors with respect and kindness.

---

## How Can I Contribute?

### 1. Reporting Bugs
- Search existing [GitHub Issues](https://github.com/MITHU-06/Canteen-Preorder-System/issues) to ensure the bug hasn't already been reported.
- If not, open a new issue using our **Bug Report** template.
- Include step-by-step reproduction instructions, screenshots, and logs where available.

### 2. Suggesting Enhancements
- Check existing issues to see if someone already proposed a similar feature.
- Open a **Feature Request** issue clearly detailing the motivation, use case, and proposed architecture.

### 3. Submitting Pull Requests
1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/<your-username>/Canteen-Preorder-System.git
   cd Canteen-Preorder-System
   ```
3. **Create a topic branch**:
   ```bash
   git checkout -b feature/awesome-new-feature
   # or
   git checkout -b fix/issue-description
   ```
4. **Make your changes**:
   - Follow clean code practices.
   - Never commit sensitive secrets, passwords, or personal credentials.
5. **Run tests & verify build**:
   ```bash
   mvn clean test
   mvn clean package
   ```
6. **Commit with Conventional Commit messages**:
   ```bash
   git commit -m "feat: add real-time order status tracking"
   ```
7. **Push to your fork & open a PR**:
   ```bash
   git push origin feature/awesome-new-feature
   ```

---

## Commit Guidelines

We recommend following the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code (white-space, formatting)
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to build process or auxiliary tools and libraries

---

## Development Environment Setup

1. **Prerequisites**:
   - Java Development Kit (JDK 21+)
   - Apache Maven 3.8+
   - MySQL Server 8.0+
2. **Database Initialization**:
   - Execute `sql/schema.sql` on your MySQL instance.
3. **Configuration**:
   - Copy `.env.example` to `.env` or update `src/main/resources/db.properties`.
4. **Compile & Package**:
   ```bash
   mvn clean package
   ```
