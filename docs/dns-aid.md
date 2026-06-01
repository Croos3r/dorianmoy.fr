# DNS for AI Discovery (DNS-AID)

Publishes a well-known entrypoint under the `_agents` namespace so agents can
discover this domain's machine-readable resources via DNS.

- Spec: https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/
- SVCB/HTTPS records: https://www.rfc-editor.org/rfc/rfc9460

> These records cannot live in this repo — they must be published in the DNS
> zone for `dorianmoy.fr` (hosted at **OVH**) and the zone must be signed with
> DNSSEC. Steps below.

## Current state (as inspected)

- Nameservers: `dns15.ovh.net`, `ns15.ovh.net` (OVH)
- DNSSEC: **not enabled** (no `DNSKEY` on the zone, no `DS` at the `.fr` parent)
- No existing `_agents` records

## Records to publish

Advertise the discovery entrypoint. The web origin `dorianmoy.fr` serves the
machine-readable resources (`/profile.jsonld`, `/robots.txt`, `/sitemap.xml`),
so the `_index` entrypoint points there over HTTPS:

```dns
_index._agents.dorianmoy.fr. 3600 IN SVCB 1 dorianmoy.fr. alpn="h2,h3" port=443
```

> `_a2a._agents` is intentionally **not** published: there is no Agent-to-Agent
> (A2A) protocol endpoint to point it at. Advertising one would create a
> dangling record that agents fail to connect to. Add it only once a real A2A
> endpoint exists, e.g.:
>
> ```dns
> _a2a._agents.dorianmoy.fr. 3600 IN SVCB 1 <a2a-host>. alpn="a2a" port=443 mandatory=alpn,port
> ```

## Publishing steps (OVH)

1. **Add the SVCB record** in the OVH DNS zone editor for `dorianmoy.fr`.
   - OVH's GUI zone editor may not expose the `SVCB` (type 64) / `HTTPS`
     (type 65) record types. If it doesn't, options are:
     - use OVH's zone-file import if it accepts type 64/65, or
     - move the zone to a provider with native SVCB/HTTPS support and
       one-click DNSSEC (e.g. Cloudflare), keeping the registrar at OVH.
2. **Enable DNSSEC** for the domain ("Activer DNSSEC" in the OVH domain
   manager). OVH generates the `DNSKEY`/`RRSIG` and, as registrar for the
   `.fr` domain, submits the `DS` record to AFNIC automatically.

## Verify after publishing

```sh
dig +dnssec SVCB _index._agents.dorianmoy.fr   # expect the SVCB answer + RRSIG
dig DS dorianmoy.fr @ns15.ovh.net              # expect a DS once DNSSEC is live
```

Then re-run the readiness scan (checks `checks.discoverability.dnsAid.status`):

```sh
curl -s https://isitagentready.com/api/scan \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://dorianmoy.fr"}'
```
