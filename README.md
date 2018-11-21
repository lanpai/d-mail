# d-mail
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

## Table of Contents
- [Installation](#installation)
- [Roadmap](#roadmap)
- [Documentation](#documentation)

---

## Installation
- Confirm that both Node.js and NPM are installed unto the system beforehand.
- Clone this repository using `git clone https://github.com/lanpai/d-mail.git`.
- Install the NPM packages using `npm install`.
- Use `npm run build` to build distributed scripts through webpack.
- Run the program using `node server.js` or PM2, etc.

---

## Roadmap
- v. **alpha-9ri51**
  - ☐ API
    - ☐ Message query (size, offset, search terms)
  - ☐ User query
    - ☐ Global
    - ☐ Per-Channel
  - ☐ Channel query
  - ☐ Channel management
    - ☐ Managing roles
      - ☐ Creating/deleting roles
      - ☐ Granting/revoking roles 
      - ☐ Editing role permissions
    - ☐ Channel properties
      - ☐ Save messages
  - ☐ Nicknames
    - ☐ Change own global nickname
    - ☐ Change own channel nickname
    - ☐ Change others' channel nickname
  - ☐ Fully implement permissions
    - ☐ Management permissions
    - ☐ Administrative permissions
    - ☐ Usage permissions
  - ☐ Roles
    - ☐ Prefix/suffix
    - ☐ Color
  - ☐ User configuration

---

## Documentation
Limited documentation is currently available in the repo within `/docs/`. This will be further updated once the project is at a stable state.