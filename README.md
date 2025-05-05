# 🛠️ Community Report App - Frontend UI

A modern web application for reporting community issues, tracking their resolution, and providing administrative oversight. Built with **React**, **React Router**, and **Tailwind CSS**.

## 📸 Features

- ✅ **Home Page** – Information on how to report an issue
- 📝 **Report Form** – Submit new reports with category, description, location & photo
- 🗺️ **Map View** – Visual display of reports using status-based pins
- 📄 **My Reports** – View all issues submitted by the user
- 🧑‍💼 **Admin Dashboard** – Manage and update the status of reported issues
- 🔐 **Login/Register** – Authentication with Tailwind-styled forms

---

## 📦 Technologies Used

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) – API communication
- [Vite or CRA (depending on your setup)] – Frontend build tool

---

## 🔗 API Endpoints

> These are powered by the backend (.NET/Api)

```http
POST    /api/auth/register
POST    /api/auth/login
GET     /api/Reports/owner/{owner}
POST    /api/Reports
GET     /api/Reports
GET     /api/Reports/{id}
PUT     /api/Reports/{id}
DELETE  /api/Reports/{id}


---

Let me know if you want this tailored with specific project names, Vite instead of CRA, or GitHub Actions/CI badges added.
