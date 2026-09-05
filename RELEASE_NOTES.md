# Eufy Home Assistant "No devices found" fix

Experimental Home Assistant add-on release for Eufy Security installations
where login succeeds but `eufy-security-ws` reports:

- `No houses found`
- `No stations found`
- `No devices found`
- `Response code not ok`

The bundled `eufy-security-client` includes upstream PR #975, which accepts
both application-level success codes `0` and `200`. This can restore inventory
discovery for Eufy accounts affected by the Passport API response change.

## Validated setup

- Home Assistant add-on on amd64
- Eufy HomeBase 2
- three eufyCam 2C cameras
- four HA devices and an alarm control panel loaded
- 593 automated tests plus image and offline smoke checks passed

## Important

This is an unofficial, temporary build of an unmerged upstream patch. Keep the
stable add-on installed for rollback and follow the installation and rollback
instructions in the README.

Do not share Eufy credentials, device serial numbers, tokens, local addresses,
or unredacted logs in GitHub issues.
