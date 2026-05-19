/**
 * ProofObject — reusable system for displaying artefacts as physical objects
 * on a stage. Three object types: document, tool, protected.
 *
 * The system is asset-ready: each card has a replaceable cover slot, so when
 * real cover assets land they can be dropped in without restructuring.
 */
export type ProofObjectType = "document" | "tool" | "protected";

export interface ProofObjectMeta {
  /** Editorial group label, e.g. "Public · Education" */
  groupShort: string;
  groupDot: string;
  /** Status label, e.g. "Public", "Protected", "In Development" */
  statusLabel: string;
  statusDot: string;
}