# Setup (about 10 minutes)

The site works without any setup (menu, cart, offers, checkout).
Google login and Gmail notifications need the keys below. Put them in the CONFIG block at the top of `app.js`.

## Always open the site with Live Server
Open it at **http://localhost:5500** (VS Code: right-click index.html > Open with Live Server).
Google login does NOT work if you double-click index.html (file://).
If Live Server uses another port, use that port in step 1.5 below.

## 1. Google login (GOOGLE_CLIENT_ID)
1. Go to https://console.cloud.google.com and create a project (any name).
2. Open "APIs & Services" > "OAuth consent screen" (newer console: "Google Auth Platform").
   Choose External, enter an app name and your email. Under Test users, add your own Gmail.
3. Open "Credentials" (newer console: "Clients") > Create > OAuth client ID > Web application.
4. Under "Authorized JavaScript origins" add BOTH:
   - http://localhost:5500
   - http://127.0.0.1:5500
   (leave "Authorized redirect URIs" empty)
5. Create, copy the Client ID (ends with .apps.googleusercontent.com) and paste it into `GOOGLE_CLIENT_ID` in app.js.
While the app is in "Testing" mode only the test users you added can sign in.

## 2. Gmail notifications (EmailJS)
1. Create a free account at https://www.emailjs.com
2. Email Services > Add New Service > Gmail > connect your Gmail. Copy the Service ID.
3. Email Templates > Create New Template:
   - Subject:  {{subject}}
   - To Email: {{to_email}}
   - Content (HTML):  Hi {{to_name}},<br>{{{message}}}    (three curly braces around message)
   Save and copy the Template ID.
4. Account > General: copy your Public Key.
5. Paste Service ID, Template ID and Public Key into app.js.
6. Optional: put your own email in OWNER_EMAIL to get a copy of every new order.

Emails sent: welcome (first login), order confirmation with bill, out for delivery, delivered.
The two tracking emails are a demo timer (20s and 45s) and only fire while the page stays open.
The free EmailJS plan has a monthly email limit.

## Coupons (edit in app.js)
WELCOME50 (first order, 50% up to 100), SAVE20 (above 599), VEG15 (veg items), FREEDEL (above 299),
plus automatic free delivery above 499.

## Notes for your report
- Login uses Google Identity Services; the signed-in profile is read in the browser. A production site
  would verify the Google token on a backend server.
- Orders and the cart are stored in the browser (localStorage), not in a database.
