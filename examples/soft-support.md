# Example: Validate the Simulator Before Expanding the Experiment

This is a condensed English illustration of a two-choice question in
AgonScientistBench. It is not the complete benchmark item or an evaluation
run: the complete item includes the frozen project and longer candidate plans.

## Research State

The project is building a physically credible soft-support simulator. A
pretrained robot policy is being used as a functional probe. Joint-limit
violations appear in the MuJoCo environment, and compatibility on a rigid
reference has not been established. An early comparison has only eight
rigid-qualified poses; the continuous joint-violation difference is not
significant, and the correlation direction is opposite to the prediction.

## Candidate Plans

**A.** Expand the pose pool and repeat the comparison to increase statistical
power for studying the apparent policy degradation.

**B.** Keep the policy frozen and first validate simulator compatibility.
Compare the robot model's joint limits, the training and evaluation runtimes'
limit conventions, contacts, and timestep. Establish a rigid reference without
joint-limit violations before validating the soft-support interaction.

## Reference Answer: B

The project is still validating its simulator. More samples cannot establish
that an unvalidated runtime's behavior is a scientific finding about
soft-support physics. The reference plan first isolates simulator/checkpoint
compatibility, then checks the physical credibility of the soft-support
interaction. It does not require retraining the policy or treating a simulator
failure as a new scientific result.

## Source and Simplification

- Source case: `soft-support-bfm__20260713-1731__4fbc2f29`.
- Source project snapshot: `f4388dcb2390a43238a22c2873213c4c9ee31f48`.
- Candidate A condenses the source wrong plan's proposal to expand the pose
  pool and continue formal comparison. Other branches are omitted.
- Candidate B condenses the source reference plan's compatibility checks and
  simulator validation. Detailed implementation and video-review instructions
  are omitted.
- A/B labels apply only to this illustration. The evaluation protocol presents
  cases in both option orders.

The reference answer reflects the case's recorded research objective and
correction. This illustrative example is not a claim that every possible
alternative experiment would be scientifically invalid.
