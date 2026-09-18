# Case-writer selection pilot

These are preliminary aggregate counts, not the final AgonScientistBench
leaderboard. The source is the team's working paper draft, section "出题模型选择"
(case-writer selection), as available on 2026-09-18. The author list and paper
URL have not been published on this site.

## Design

- 20 research breakpoints.
- Each of three models wrote a case for each breakpoint.
- Each of three answering models answered each writer's case set.
- Both option orders were tested, giving 40 runs per writer/answerer/arm cell.
- Project arm: the model can inspect the project snapshot.
- Options-only arm: the model receives the candidate plans without the project.
- All runs used medium reasoning effort. Model labels follow the working draft.
- Total: 20 × 3 × 3 × 2 × 2 = 720 runs.

The CSV contains all 18 aggregate cells. Its `runs` column is the denominator.
Website filters sum cells and then divide correct answers by total runs; they
never average pre-rounded percentages. With all writers, the pooled project
result is 130/360 = 36.1%, and the options-only result is 207/360 = 57.5%.

## Interpretation

This pilot compares case construction as well as model behavior. Performance
without the project may reflect cues in how options were written. Model
comparisons should therefore keep the case writer and evaluation arm explicit.

The rows are shown in a fixed model order, not as an official ranking. Shared
breakpoints and repeated option orders mean individual runs are not independent.
Aggregate counts alone do not provide the paired run-level data needed to
establish significance or estimate appropriate confidence intervals. The
website does not present such tests or claim that project context causally
hurts research ability in general.

## Files

- [pilot-results.csv](pilot-results.csv): original counts used by the website.
- The site displays this pilot separately from the upcoming first release.
