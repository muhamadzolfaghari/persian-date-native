# Persian Date for Laravel Frontend & Blade

Why `persian-date-native` complements Laravel backends (such as `morilog/jalali`) for browser-side date formatting.

---

## ⚡ Architecture Pattern

- Backend stores standard UTC ISO 8601 timestamps in PostgreSQL/MySQL.
- Frontend renders localized Persian dates on client devices according to user timezone using `persian-date-native`.
