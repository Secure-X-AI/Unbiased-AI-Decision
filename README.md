# Unbiased AI Decision - Fullstack Local Setup

## Default admin login
- Username: `admin`
- Password: `admin`

## Roles
- **User**: can register independently and use the analyzer.
- **Moderator**: created by admin only; can add/edit About blogs and News.
- **Admin**: can create admins/moderators/users, manage pricing, blogs, news, users and maintenance content.

## Run locally

1. Start XAMPP Apache + MySQL.
2. Open phpMyAdmin and import:
   `database/unbiased_ai_decision.sql`
3. Create `.env` in the project root:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=YOUR_NEW_GEMINI_KEY
GEMINI_MODEL=gemini-2.0-flash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=unbiased_ai_decision
DB_DISABLED=false
```

4. Install dependencies:

```bash
npm install
```

5. Start backend:

```bash
npm run server
```

6. Start frontend in a second terminal:

```bash
npm run dev
```

7. Open:
`http://localhost:5173`

## Fixed buttons
- About navbar now scrolls to the About & News section.
- Login and Sign Up work.
- Admin panel appears after admin/moderator login.
- Download Report saves a `.txt` report.
- Share uses browser share when available, otherwise copies report to clipboard.
- Pricing is loaded from SQL and editable by admin.
