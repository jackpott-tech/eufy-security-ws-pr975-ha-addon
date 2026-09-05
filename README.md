# Eufy Home Assistant: "No devices found" fix

**Experimental Home Assistant add-on for Eufy HomeBase 2, eufyCam 2C, and
other Eufy Security devices affected by an empty device inventory after the
Passport API `code: 200` migration.**

This rollback-friendly build targets Eufy accounts that authenticate
successfully in `eufy-security-ws`, but return no houses, stations, or devices
because newer Eufy API responses use `code: 200` for success.

## Symptoms and log messages

This project may help when the Eufy Security app works normally, but Home
Assistant or `eufy-security-ws` shows one or more of these symptoms:

- `No houses found`
- `No stations found`
- `No devices found`
- `Response code not ok`
- Eufy login succeeds, but the device inventory remains empty
- HomeBase 2 or eufyCam 2C devices are missing in Home Assistant
- the API response contains `code: 200`, but the client treats it as an error

Common German searches: **Eufy keine Geräte gefunden**, **Eufy HomeBase 2
nicht in Home Assistant**, **Eufy keine Stationen gefunden**, or **Eufy App
funktioniert, Home Assistant findet keine Kameras**.

This project packages:

- `eufy-security-client` `4.1.0` plus upstream
  [PR #975](https://github.com/bropat/eufy-security-client/pull/975)
- `eufy-security-ws` `3.1.0`
- a side-by-side Home Assistant add-on named **eufy-security-ws PR975 Test**

> [!WARNING]
> This is an unofficial temporary build of an unmerged upstream patch. Prefer
> an official upstream release once the fix is merged and published.

## What the patch fixes

Older client code accepts application-level success code `0`. Some migrated
Eufy accounts now return success as `200`, causing passport, house, station,
and device responses to be rejected even though login succeeded. PR #975 adds
one helper that accepts exactly `0` or `200` and applies it to the affected
response checks. Other values remain failures.

This specifically addresses the Passport/API success-code compatibility issue;
it is not a general fix for invalid credentials, two-factor authentication,
network discovery, RTSP, or unsupported Eufy hardware.

## Validation

Validated on 2026-09-05:

- client: 372/372 tests, 19/19 suites
- WebSocket server: 221/221 tests, 5/5 suites
- TypeScript builds: passed
- pinned amd64 Home Assistant base-image build: passed
- offline smoke: `0=true`, `200=true`, `500=false`
- server CLI smoke test: passed
- live inventory: HomeBase 2 plus three eufyCam 2C devices
- Home Assistant: four devices, three camera entities, and one alarm control
  panel loaded successfully

The live validation read state only. It did not issue alarm, guard-mode,
camera, or other device commands.

## Install in Home Assistant

1. Open **Settings → Add-ons → Add-on Store → Repositories**.
2. Add this repository:

   ```text
   https://github.com/jackpott-tech/eufy-security-ws-pr975-ha-addon
   ```

3. Install **eufy-security-ws PR975 Test**.
4. Leave the existing stable add-on installed for rollback.
5. Configure Eufy credentials in the Home Assistant add-on UI. Never put them
   in an issue, log excerpt, command, or repository file.
6. Start with manual boot and port `3001`. Stop the stable add-on before
   starting this one; avoid sustained simultaneous sessions for one account.
7. Confirm that the log shows a non-zero house/station/device inventory.
8. To replace a stable service already used at `127.0.0.1:3000`, stop the test
   add-on, change its port to `3000`, then start it. Reload the Eufy Security
   integration and verify read-only states first.
9. After validation, set this add-on to automatic boot and the stable add-on
   to manual boot.

The add-on supports `amd64` and `aarch64`.

## Rollback

1. Stop **eufy-security-ws PR975 Test**.
2. Set the original stable add-on to automatic boot and start it on port
   `3000`.
3. Reload the Home Assistant Eufy Security integration.
4. Keep the test add-on installed until rollback is confirmed.

No uninstall or data deletion is required.

## Rebuild from pinned sources

Requirements: Git, Docker, and a Linux `amd64` or `aarch64` host.

```bash
./scripts/rebuild.sh
```

The script verifies pinned commits and the patch checksum, runs clean installs,
all tests and builds, builds the Home Assistant image, performs offline smoke
checks, and writes a checksummed add-on archive under `artifacts/`.

### Pinned inputs

| Input | Pin |
| --- | --- |
| client tag / commit | `4.1.0` / `10155f572a0f261acb207c76edc17e2cae78de90` |
| PR #975 head | `e55aa8597aeafc0ad81d0b573aadf4408f77083d` |
| patch SHA-256 | `2b7dd562d4186823f74eac46869f1ed7dfb6c09e2a7559c31866be3fbef09709` |
| ws tag / commit | `3.1.0` / `e4709320f4e01e976ee65d53e763b6a656f0137d` |
| Node image | `node:24-alpine@sha256:e67514e5d0f6c46656005e1b693b2ec9d52e80b641307de684d4a015ba7a4eaf` |
| HA amd64 base | `sha256:322c4492f25f9c2ca04b0789101a44350c516f4d3cd928fca14847ef19668ede` |
| HA aarch64 base | `sha256:e81d9f268833456f9803da051fa95fd8fa4e1fad1f911dec1a489a18701a76f5` |

## Security and privacy

- Use a separate Eufy account shared with only the required devices when
  possible.
- Redact account data, serial numbers, station identifiers, local addresses,
  tokens, and session identifiers before sharing logs.
- Report security concerns as described in [SECURITY.md](SECURITY.md).

## Credits and license

This project is a packaging and validation layer around work by
[bropat](https://github.com/bropat) and the contributors to
`eufy-security-client`, `eufy-security-ws`, and the Home Assistant add-on.
See [NOTICE.md](NOTICE.md) and [LICENSE](LICENSE).
