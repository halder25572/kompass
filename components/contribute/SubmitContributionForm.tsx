"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContributionMutation } from "@/features/contribute/hooks/services";
import type { SubmitContributionPayload, SubmitContributionResponse } from "@/types/api";

interface Props {
  inviterId: string | number;
  code: string;
}

export default function SubmitContributionForm({ inviterId, code }: Props) {
  const { mutate, isPending } = useSubmitContributionMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contributionId, setContributionId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: SubmitContributionPayload = {
      name,
      email,
      answers: [],
      images: [],
    };

    mutate(
      { inviterId, code, payload },
      {
        onSuccess: (response: SubmitContributionResponse) => {
          const contributor = response?.data;
          const id = contributor?.id ?? null;
          if (id) {
            setContributionId(id);
            toast.success(contributor?.name ? `${contributor.name} submitted successfully` : "Contribution submitted successfully");
          } else {
            toast.success(response.message || "Submitted");
          }

          if (contributor) {
            console.log("Contribution submitted:", {
              id: contributor.id,
              name: contributor.name,
              email: contributor.email,
              status: contributor.status,
            });
          }
        },
        onError: (err: Error) => {
          toast.error(err.message || "Submission failed");
        },
      }
    );
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-block px-4 py-2 bg-[#BF003A] text-white rounded disabled:opacity-60"
        >
          {isPending ? "Submitting..." : "Submit Contribution"}
        </button>
      </form>

      {contributionId && (
        <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded">
          <p className="text-sm">Contribution submitted.</p>
          <p className="text-sm font-medium">ID: {contributionId}</p>
        </div>
      )}
    </div>
  );
}
