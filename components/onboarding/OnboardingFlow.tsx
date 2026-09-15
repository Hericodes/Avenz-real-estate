"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Business = {
  name: string;
  location: string | null;
  businessType: string | null;
  description: string | null;
};

type Teammate = {
  name: string;
  tone: string;
  customInstructions: string | null;
};

const businessTypes = [
  "Real Estate",
  "Property Development",
  "Property Management",
  "Real Estate Agency",
  "Other",
];

const tones = [
  "Professional",
  "Friendly",
  "Professional & Friendly",
];

const emptyBusiness: Business = {
  name: "",
  location: "",
  businessType: "",
  description: "",
};

const emptyTeammate: Teammate = {
  name: "",
  tone: "Professional & Friendly",
  customInstructions: "",
};

export function OnboardingFlow({
  initialBusiness,
  initialTeammate,
}: {
  initialBusiness: Business | null;
  initialTeammate: Teammate | null;
}) {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [business, setBusiness] = useState<Business>(
    initialBusiness ?? emptyBusiness
  );

  const [teammate, setTeammate] = useState<Teammate>(
    initialTeammate ?? emptyTeammate
  );

  async function save(path: string, payload: object) {
    setSaving(true);
    setError("");

    try {
      const response = await fetch(path, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || "Something went wrong. Give it another try."
        );

        return null;
      }

      return data;
    } catch {
      setError(
        "We couldn't save that right now. Check your connection and try again."
      );

      return null;
    } finally {
      setSaving(false);
    }
  }

  async function nextBusiness() {
    if (!business.name.trim()) {
      setError("Let's start with your business name.");
      return;
    }

    if (!business.businessType) {
      setError("Pick the type of business you run.");
      return;
    }

    const data = await save("/api/onboarding/business", {
      ...business,
      name: business.name.trim(),
    });

    if (!data) {
      return;
    }

    setBusiness(data.business);
    setStep(2);
  }

  async function nextTeammate() {
    if (!teammate.name.trim()) {
      setError(
        "Your teammate needs a name. Even coworkers have names. 😄"
      );
      return;
    }

    const data = await save("/api/onboarding/teammate", {
      ...teammate,
      name: teammate.name.trim(),
    });

    if (!data) {
      return;
    }

    setBusiness(data.business);
    setTeammate(data.teammate);
    setStep(3);
  }

  function updateBusiness(field: keyof Business, value: string) {
    setBusiness((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }

  function updateTeammate(field: keyof Teammate, value: string) {
    setTeammate((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }

  return (
    <main className="onboarding-page">
      <section className="onboarding-card">
        <div className="onboarding-brand">AVNEZ</div>

        <div className="onboarding-progress">
          <span>Step {step} of 3</span>

          <div
            className="progress-dots"
            aria-label={`Step ${step} of 3`}
          >
            {[1, 2, 3].map((item) => (
              <i
                className={item <= step ? "active" : ""}
                key={item}
              />
            ))}
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="onboarding-content">
            <div>
              <p className="eyebrow">Let&apos;s get acquainted</p>

              <h1>
                First, tell us a little about your business.
              </h1>

              <p>
                Nothing complicated. Just the basics so your
                teammate knows who they&apos;re working for.
              </p>
            </div>

            <div className="onboarding-form">
              <label>
                Business name

                <input
                  type="text"
                  value={business.name}
                  onChange={(event) =>
                    updateBusiness("name", event.target.value)
                  }
                  placeholder="e.g. PrimeNest Realty"
                  autoComplete="organization"
                />
              </label>

              <label>
                Business location

                <input
                  type="text"
                  value={business.location ?? ""}
                  onChange={(event) =>
                    updateBusiness(
                      "location",
                      event.target.value
                    )
                  }
                  placeholder="e.g. Lagos, Nigeria"
                />
              </label>

              <fieldset>
                <legend>What kind of business is this?</legend>

                <div className="choice-grid">
                  {businessTypes.map((type) => (
                    <label
                      className={`choice ${
                        business.businessType === type
                          ? "selected"
                          : ""
                      }`}
                      key={type}
                    >
                      <input
                        type="radio"
                        name="businessType"
                        value={type}
                        checked={business.businessType === type}
                        onChange={() =>
                          updateBusiness(
                            "businessType",
                            type
                          )
                        }
                      />

                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label>
                Business description <span>Optional</span>

                <textarea
                  value={business.description ?? ""}
                  onChange={(event) =>
                    updateBusiness(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Tell us briefly what your business does..."
                  rows={4}
                />
              </label>
            </div>

            {error && (
              <p className="onboarding-error" role="alert">
                {error}
              </p>
            )}

            <button
              className="onboarding-primary"
              disabled={saving}
              onClick={nextBusiness}
              type="button"
            >
              {saving ? "Saving..." : "Continue →"}
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="onboarding-content">
            <button
              className="back-button"
              onClick={() => {
                setError("");
                setStep(1);
              }}
              type="button"
            >
              ← Back
            </button>

            <div>
              <p className="eyebrow">Meet your teammate</p>

              <h1>
                Let&apos;s give your teammate some direction.
              </h1>

              <p>
                You know your business better than we do.
                A little context goes a long way.
              </p>
            </div>

            <div className="onboarding-form">
              <label>
                Teammate name

                <input
                  type="text"
                  value={teammate.name}
                  onChange={(event) =>
                    updateTeammate(
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="e.g. Ava"
                  autoComplete="off"
                />
              </label>

              <fieldset>
                <legend>
                  How should your teammate talk to customers?
                </legend>

                <div className="choice-grid tones">
                  {tones.map((tone) => (
                    <label
                      className={`choice ${
                        teammate.tone === tone
                          ? "selected"
                          : ""
                      }`}
                      key={tone}
                    >
                      <input
                        type="radio"
                        name="tone"
                        value={tone}
                        checked={teammate.tone === tone}
                        onChange={() =>
                          updateTeammate("tone", tone)
                        }
                      />

                      <span>{tone}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label>
                What should your teammate know?

                <textarea
                  value={teammate.customInstructions ?? ""}
                  onChange={(event) =>
                    updateTeammate(
                      "customInstructions",
                      event.target.value
                    )
                  }
                  placeholder="e.g. We specialize in luxury apartments in Lekki and Ikoyi. Our properties start from ₦50M..."
                  rows={5}
                />
              </label>

              <small>
                Don&apos;t worry, you can change this later.
              </small>
            </div>

            {error && (
              <p className="onboarding-error" role="alert">
                {error}
              </p>
            )}

            <button
              className="onboarding-primary"
              disabled={saving}
              onClick={nextTeammate}
              type="button"
            >
              {saving ? "Saving..." : "Continue →"}
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="onboarding-content ready">
            <button
              className="back-button"
              onClick={() => {
                setError("");
                setStep(2);
              }}
              type="button"
            >
              ← Back
            </button>

            <div>
              <p className="eyebrow">Nice. We&apos;re ready.</p>

              <h1>Your teammate is ready.</h1>

              <p>
                {teammate.name} now knows the basics about{" "}
                {business.name} and how you want customers
                treated.
              </p>
            </div>

            <div className="teammate-card">
              <strong>
                <b>✦</b> {teammate.name}
              </strong>

              <span>Sales Teammate</span>

              <hr />

              <em>{teammate.tone}</em>

              <p>
                {business.location || "Location not specified"}
                {" · "}
                {business.businessType}
              </p>
            </div>

            <button
              className="onboarding-primary"
              onClick={() => router.push("/app")}
              type="button"
            >
              Meet {teammate.name} →
            </button>
          </div>
        )}
      </section>
    </main>
  );
}