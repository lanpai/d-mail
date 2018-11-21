## TECHNICIAN MANAGEMENT CONSOLE

---

### Table of Contents
- [createchannel (name) (id) (owner)](#createchannel-id-owner)
- [permcheck (user id) (channel id) (permission id)](#permcheck-user-id-channel-id-permission-id)
- [querychannel (id)](#querychannel-id)

---

#### createchannel (id) (owner)
- `id` *( string )* - id of new channel
- `owner` *( int )* - id of owner

Creates a new channel `#{id}` with owner `@{owner}`.

#### permcheck (user id) (channel id) (permission id)
- `user id` *( int )* - id of checked user
- `channel id` *( string )* - id of checked channel
- `permission id` *( string )* - id of checked permission

Checks if user `@{user id}` has permission `permission id`  in channel `#{channel id}`.

#### querychannel (id)
- `id` *( int )* - id of queried channel

Returns information about the given channel.