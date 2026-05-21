export type ParticipantPages = { participantIndex: number; pages: number[] };

/**
 * Given a 1-based participant index and pages per participant (default 2),
 * returns the page numbers assigned to that participant.
 * Example: participant 1 -> [1,2], participant 2 -> [3,4]
 */
export function pagesForParticipant(participantIndex: number, pagesPerParticipant = 2): number[] {
    if (participantIndex < 1 || !Number.isInteger(participantIndex)) {
        throw new Error("participantIndex must be a positive integer (1-based)");
    }

    const start = (participantIndex - 1) * pagesPerParticipant + 1;
    const pages: number[] = [];
    for (let i = 0; i < pagesPerParticipant; i++) {
        pages.push(start + i);
    }
    return pages;
}

/**
 * Map an array of contributions to assigned pages.
 * - `contributions` should be ordered in the sequence you want them mapped.
 * - `maxPages` is the theme's total page count (e.g., 20).
 */
export function mapContributionsToPages(
    contributions: { id: number }[],
    pagesPerParticipant = 2,
    maxPages = 20
): ParticipantPages[] {
    return contributions.map((c, i) => {
        const participantIndex = i + 1;
        const pages = pagesForParticipant(participantIndex, pagesPerParticipant);
        // Validate pages don't exceed maxPages
        const validPages = pages.filter((p) => p <= maxPages);
        return { participantIndex, pages: validPages };
    });
}
