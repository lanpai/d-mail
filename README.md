# d-mail 📮 *💌☴*
alternative, decentralized messaging application developed within Node.js powered by popular packages:
- express
- socket&#8203;.io
- lowdb
- webpack
- bcrypt
- \+ more

---

key|val
-|-
CURRENT VERSION | pre-alpha-9ri51
AUTHOR | lanpai ([piyo.cafe](https://piyo.cafe))
LICENSE | MIT

---

## 📚 Table of Contents
- [Installation](#💽-installation)
- [Roadmap](#🚧-roadmap)
- [Documentation](#📄-documentation)

---

## 💽 Installation
- Confirm that both Node.js and NPM are installed unto the system beforehand.
- Clone this repository using `git clone https://github.com/lanpai/d-mail.git`.
- Install the NPM packages using `npm install`.
- Use `npm run build` to build distributed scripts through webpack.
- Run the program using `node server.js` or PM2, etc.

---

## 🚧 Roadmap
- v. **alpha-9ri51**
  - 🗹 API
    - 🗹 Message query
    - 🗹 Channel query
  - 🗹 User query
    - 🗹 Global
      - 🗹 Nick
      - 🗹 Status
      - 🗹 Note
    - 🗹 Per-Channel
      - 🗹 Channel nick
      - 🗹 Roles
  - ☐ Channel management
    - ☐ Managing roles
      - ☐ Creating/deleting roles
      - ☐ Granting/revoking roles 
      - ☐ Editing role permissions
    - ☐ Channel properties
      - ☐ Save messages
  - ☐ Fully implement permissions
    - ☐ Management permissions
    - ☐ Administrative permissions
    - ☐ Usage permissions
  - ☐ User configuration
  - ☐ Channel properties
    - ☐ Topic
    - ☐ Pinned messages
  - ☐ Accept X-Forwarded-To to allow reverse proxies
  - 🗹 Sanitize channel id's

- Later Features
  - ☐ Easily-themeable
    - ☐ Easy configuration .ini's
    - ☐ Advanced CSS files
  - ☐ Images embeddable anywhere in messages
  - ☐ Profile
    - ☐ Picture
    - ☐ Implement personal note
  - ☐ Friends system
  - ☐ Direct messaging other users
  - ☐ Roles
    - ☐ Prefix/suffix
    - ☐ Color
  - ☐ Email confirmation and reset password
  - ☐ Nicknames
    - ☐ Change own global nickname
    - ☐ Change own channel nickname
    - ☐ Change others' channel nickname
  - ☐ Encryption layer to database
  - ☐ Configurable HTTPS layer

---

## 📄 Documentation
Limited documentation is currently available in the repo within `/docs/`. This will be further updated once the project is at a stable state.
- [Technician Management Console (/docs/tmc.md)](https://github.com/lanpai/d-mail/blob/master/docs/tmc.md)
- [Error Codes (/docs/errorcodes.md)](https://github.com/lanpai/d-mail/blob/master/docs/errorcodes.md)

---

*Made with 💖 by lanpai*