import { useGame } from "../context/GameContext";
import { IconCheck } from "./icons";

const SIMPLE_PROMPT = "conduct cybersecurity audit";

const DETAILED_PROMPT = `Act like a senior security engineer auditing a production application.

Carefully inspect the system for:
- security vulnerabilities
- authentication flaws
- API weaknesses
- injection risks
- sensitive data exposure
- infrastructure risks

Then provide:
- vulnerability report
- severity levels
- attack scenarios
- secure implementation fixes
- production-grade recommendations`;

const SIMPLE_RESPONSE = `Sure, here are some general cybersecurity tips:
- Use strong passwords
- Keep software updated
- Enable two-factor authentication
- Run regular backups`;

const DETAILED_RESPONSE = `VULNERABILITY REPORT
- Auth: session tokens don't expire after password reset
- API: no rate limiting on /api/login
- Injection: unparameterized input in search query
- Data exposure: customer PII leaking in error messages
- Infra: admin panel reachable without IP allowlisting

SEVERITY LEVELS
Critical — SQL injection (search endpoint)
High — missing rate limiting, exposed admin panel
Medium — session token not invalidated on reset
Low — verbose error messages leaking PII

ATTACK SCENARIOS
An attacker chains the unauthenticated admin panel with the
missing rate limit to brute-force credentials, then exploits the
unparameterized search query to extract the customer database.

SECURE IMPLEMENTATION FIXES
- Parameterize all queries / use an ORM
- Add rate limiting + lockout on /api/login
- Restrict admin panel to allowlisted IPs
- Invalidate sessions on password reset
- Strip PII from error responses

PRODUCTION-GRADE RECOMMENDATIONS
- Add SAST/DAST scanning to CI/CD
- Schedule quarterly penetration tests
- Put a WAF in front of the app
- Centralize security logging and alerting`;

const DETAILED_TRAITS = [
  "Assigns a role — “senior security engineer,” not a generic assistant",
  "Names the specific risk categories to check, not just “security”",
  "Specifies the output structure it actually needs back",
  "Separates findings from severity from fixes — usable, not just descriptive",
];

export default function WhyPromptingMatters() {
  const { setScreen } = useGame();

  return (
    <div className="card why-page">
      <button className="link-button back-link" onClick={() => setScreen("home")}>
        ← Back
      </button>

      <h2>The gap between a prompt and a result</h2>
      <p className="scenario">
        Same AI. Same task. The only thing that changed is how the request was written.
      </p>

      <div className="showcase-compare why-compare">
        <div className="showcase-attempt">
          <div className="showcase-attempt-label">One line</div>
          <p className="showcase-prompt-text">&ldquo;{SIMPLE_PROMPT}&rdquo;</p>
          <div className="mock-response">
            <div className="mock-response-label">Response:</div>
            <pre>{SIMPLE_RESPONSE}</pre>
          </div>
        </div>

        <div className="showcase-arrow" aria-hidden="true">
          →
        </div>

        <div className="showcase-attempt why-attempt-good">
          <div className="showcase-attempt-label">Role, checklist, structure</div>
          <pre className="showcase-prompt-text why-prompt-block">{DETAILED_PROMPT}</pre>
          <div className="mock-response">
            <div className="mock-response-label">Response:</div>
            <pre>{DETAILED_RESPONSE}</pre>
          </div>
        </div>
      </div>

      <div className="why-traits">
        <h3>What the second prompt actually did differently</h3>
        <ul>
          {DETAILED_TRAITS.map((trait) => (
            <li key={trait}>
              <IconCheck /> {trait}
            </li>
          ))}
        </ul>
      </div>

      <p className="why-closing">
        Nobody is born knowing how to write the prompt on the right. It's a skill —
        which is the entire premise of Prompt Quest: short, realistic missions that make
        you practice exactly this until it's second nature.
      </p>

      <button className="primary" onClick={() => setScreen("home")}>
        Back to Prompt Quest
      </button>
    </div>
  );
}
