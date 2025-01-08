import Link from "next/link";
import styles from "./page.module.css";

export default function PolicyPage() {
  return (
    <main className={styles.policy}>
      <section>
        <h1>Privacy Policy</h1>
        <p>Last Updated January 8, 2025</p>
      </section>
      <section>
        <h3>Introduction</h3>
        <p>
          Welcome to Event! Your privacy is important to us, and we are
          committed to protecting the information you share with us. This
          Privacy Policy explains how we collect, use, and safeguard your data
          when you use Event. By using Event, you agree to the practices
          described in this policy.
        </p>
      </section>
      <section>
        <h3>About Event</h3>
        <p>
          Event is a platform designed to streamline event organization and
          participation. It enables users to manage events, share information,
          and interact seamlessly with participants and organizers. Whether
          you&apos;re organizing a small gathering or a large conference, Event
          provides the tools needed for efficient communication and management.
        </p>
      </section>
      <section>
        <h3>Information We Collect</h3>
        <p>
          When you use Event, we may collect the following types of information:
        </p>
        <ol>
          <li>
            <h4>Personal Information:</h4>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>University or organization affiliation</li>
              <li>Event preferences or participation history</li>
            </ul>
          </li>
          <li>
            <h4>Non-Personal Information:</h4>
            <ul>
              <li>Usage data (e.g., how you interact with Event)</li>
              <li>Device information (e.g., browser type, operating system)</li>
              <li>Log data (e.g., IP address, timestamps)</li>
            </ul>
          </li>
          <li>
            <h4>Third-Party Integration Data:</h4>
            <ul>
              <li>
                If you connect Event with third-party services (e.g., Google
                Calendar), we may access certain data from those services as
                authorized by you.
              </li>
            </ul>
          </li>
        </ol>
      </section>
      <section>
        <h3>How We Use Your Information</h3>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Facilitate event organization and participation.</li>
          <li>Send notifications and updates about events.</li>
          <li>Improve Event&apos;s functionality and user experience.</li>
          <li>Respond to your inquiries or provide support.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </section>
      <section>
        <h3>Data Sharing and Disclosure</h3>
        <p>
          We do not sell your data to third parties. However, we may share your
          information in the following circumstances:
        </p>
        <ol>
          <li>
            <h4>With Your Consent:</h4>
            <ul>
              <li>
                When you explicitly agree to share your data with other users or
                services.
              </li>
            </ul>
          </li>
          <li>
            <h4>Service Providers:</h4>
            <ul>
              <li>
                Trusted third-party vendors who assist in operating Event (e.g.,
                hosting providers, analytics tools). These providers are
                obligated to keep your data secure.
              </li>
            </ul>
          </li>
          <li>
            <h4>Legal Requirements:</h4>
            <ul>
              <li>
                If required by law or to protect the rights and safety of our
                users.
              </li>
            </ul>
          </li>
        </ol>
      </section>
      <section>
        <h3>Data Retention</h3>
        <p>
          We retain your data only for as long as necessary to fulfill the
          purposes outlined in this Privacy Policy or as required by law. You
          may request the deletion of your data by contacting us.
        </p>
      </section>
      <section>
        <h3>Data Security</h3>
        <p>
          We implement industry-standard security measures to protect your data
          from unauthorized access, loss, or misuse. However, no method of
          transmission or storage is entirely secure, and we cannot guarantee
          absolute security.
        </p>
      </section>
      <section>
        <h3>Your Rights</h3>
        <p>Depending on your location, you may have the following rights:</p>
        <ul>
          <li>Access your personal data.</li>
          <li>Update or correct inaccurate information.</li>
          <li>Request the deletion of your data.</li>
          <li>Opt out of certain data processing activities.</li>
          <li>Withdraw consent at any time.</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the details below.
        </p>
      </section>
      <section>
        <h3>Third-Party Links and Services</h3>
        <p>
          Event may contain links to third-party websites or integrate with
          external services. We are not responsible for the privacy practices of
          these third parties. We encourage you to review their privacy
          policies.
        </p>
      </section>
      <section>
        <h3>Children&apos;s Privacy</h3>
        <p>
          Event is not intended for use by individuals under the age of 13. We
          do not knowingly collect personal data from children. If we become
          aware of such data, we will delete it promptly.
        </p>
      </section>
      <section>
        <h3>Changes to This Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          effective upon posting the updated policy. We encourage you to review
          this policy periodically to stay informed about how we protect your
          data.
        </p>
      </section>
      <section>
        <h3>Contact Us</h3>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <ul>
          <li>
            <h4>Email:</h4>
            <Link
              href="mailto:s.abduraximov@newuu.uz"
              target="_blank"
              rel="noopener noreferrer"
            >
              s.abduraximov@newuu.uz
            </Link>
          </li>
          <li>
            <h4>Telegram:</h4>
            <Link
              href="https://t.me/chebarash"
              target="_blank"
              rel="noopener noreferrer"
            >
              @chebarash
            </Link>
          </li>
        </ul>
        <p>Thank you for trusting Event with your event management needs!</p>
      </section>
    </main>
  );
}
