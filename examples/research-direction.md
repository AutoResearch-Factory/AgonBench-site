# Example: Preserve the Research Question

A condensed English illustration of a two-choice source case, not the complete
evaluation item. The complete item includes the frozen project and longer plans.

## Research state

The project asks whether an LLM can navigate by reading a named-place text graph
and producing a route as a list of place names. A visual place linker provides
node identity. A proposed alternative centers calibrated place recognition,
uses BFS/A* as the main planner, and demotes LLM routing to an appendix.

## Plans

**A.** Center the calibrated place-recognition study, use graph search as the
main planner, and keep LLM string routing as a secondary diagnostic.

**B.** Test LLM route validity on named graphs with BFS/A* as a control, validate
the visual linker as a supporting component, and only then evaluate the complete
navigation system.

## Reference: B

Plan A changes the project's main scientific objective. The reference retains
LLM routing as the object of study, uses graph search as an interpretable control,
and validates the supporting linker before proceeding to end-to-end evaluation.
The claim is about this project's stated objective, not that place-recognition
research is inherently less valuable.

## Provenance

- Source case: `vln-verbal-route__20260622-0340__16a1a55c`.
- Snapshot: `3f769d90a46f51b7d8a4d5724a5920c7d7805c28`.
- The homepage graph is an illustrative schematic, not a recovered navigation
  trace. Place names and geometry are illustrative.
- The condensed options omit detailed graph sizes, metrics, datasets, and
  supporting experiment gates. The full protocol tests both option orders.
