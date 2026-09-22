# Impossible: handling data deletion requests

Operator instructions, not part of the customer privacy policy.

## Request channel

Monitor titleunknownstudios@gmail.com for the subject **Impossible data deletion request**.
The policy at `/privacy-policy/impossible/#data-deletion` provides a prefilled email link
and a plain email address. This is a manual support workflow, not automatic deletion.

Meta explicitly permits email as the deletion-request mechanism:
https://developers.meta.com/horizon/policy/privacy-policy/

## Before resubmission

- Confirm the mailbox is monitored and can receive and reply to external email. Test the
  published button with a test request and confirm receipt; opening a mail composer is not delivery.
- Verify administrative access to the app's leaderboard and the single-entry deletion workflow
  with a disposable test account/entry that you are authorized to delete. Do not use a real
  customer's entry as a test. No deletion or mailbox access was performed by this repo change.
- Assign someone to handle requests promptly. The published policy aims for completion within
  30 days from receipt and requires acknowledgement, minimum necessary verification and confirmation.
- Review the policy against the released build and actual support practices before publication.

## For each request

1. Acknowledge receipt. Record receipt date, requested scope and status in a restricted support
   record, not in this repository. Ask only for information needed to locate and verify the entry.
2. Verify account ownership before deleting. Display names are not unique and email sender
   addresses cannot be matched against Meta account emails through this game's SDK integration.
   Do not accept a public username or screenshot alone as proof of ownership. Use a supported
   authenticated account check or seek Meta developer support if you cannot establish ownership.
   Never request passwords, login codes, payment information or identity-document scans.
3. Identify the specific entry in the app's `impossible_ascent_v1` leaderboard and verify its
   app-scoped user ID. Consult Meta's current server API documentation for retrieving entries:
   https://developers.meta.com/horizon/documentation/android-apps/ps-leaderboards-s2s/
4. Meta documents deletion of one entry as `DELETE https://graph.oculus.com/{entry_id}` using
   app credentials. Use the leaderboard **entry ID**, not the user ID or leaderboard ID.
   Use trusted administrative tooling. Keep app secrets out of the website, Unity client,
   repository, screenshots and logs. Do not use the delete-all or delete-leaderboard endpoints.
5. Check the API's success response and retrieve the relevant entries again to confirm removal.
   An already-absent entry needs no deletion; explain that outcome. Do not claim success on errors.
6. Handle requested support-correspondence deletion, including duplicates and trash where
   applicable. Retain only information necessary for a documented legal obligation; explain any
   exception. Do not keep a permanent unnecessary copy of the user's request as a deletion log.
7. Explain how the player can remove local app data; you cannot clear it remotely. Clarify that
   uninstalling does not remove the online entry and future online play can submit new scores.
8. Confirm the outcome, scope and date by email, including any outstanding verification or
   retention exception. Avoid including sensitive account identifiers unnecessarily.

## Resubmission

Publish the updated page at its existing HTTPS URL, confirm it opens without login and the
request link works, then update the DUC answers to explicitly acknowledge collection of User ID,
User Profile and Blocked Users data. Describe temporary memory use separately from retention.
Do not describe the app as collecting nothing because it has no developer-hosted database.
Keep prior policy versions in version control. Publishing, pushing and DUC resubmission are
separate steps; this local edit does not perform them.
