import "./tokens.css";
import "./base.css";
import "./components/atoms.css";
import "./components/forms.css";
import "./components/overlays.css";
import "./components/content.css";
import "./components/motion.css";
import "./components/loading.css";
import "./components/effects.css";
import "./lab/effects-lab.css";
import "./motion/shared-lightbox.css";
import "./components/agent.css";
import "./components/hscroll.css";

export { SkinProvider, useTheme } from "./theme/SkinProvider";
export type { SkinId, Mode, FontId } from "./theme/SkinProvider";

export { Reveal, Button, Badge, Kicker, SectionHead, ChipGroup, Rating, Avatar, Tooltip } from "./components/atoms";
export { TextField, SelectField, Switch, Checkbox, RadioGroup, RangeField } from "./components/forms";
export { Modal, ConfirmModal, ErrorModal, ToastProvider, useToast, Lightbox } from "./components/overlays";
export { Card, Table, Tabs, Accordion, Pagination, EmptyState, Skeleton } from "./components/content";
export type { Col } from "./components/content";
export { PageTransition, viewNavigate } from "./components/motion";
export type { PageVariant } from "./components/motion";
export { Spinner, Progress, CountUp, LazyImage } from "./components/loading";
/* CORE / CONTROLLED：基础入场与受控能力 */
export { TypingText, TextReveal, Magnetic } from "./components/effects"; // Magnetic = CONTROLLED

/* ⚠️ LAB：默认禁止进入正式实现（DESIGN.md §6.4），见 src/lab/README.md */
export { GradientText, Marquee, Tilt, Beam, Aurora } from "./lab/effects-lab";
export { ThreeShapes, ParticleField } from "./lab/three-canvas";

/* CONTROLLED · P0：Shared Element Transition（M01/M05，需 Continuity Intent） */
export { SharedLightbox } from "./motion/shared-lightbox";

/* BRAND：猫是角色不是装饰（DESIGN.md §6.2） */
export { CatMark, CatFull, catLoafGroup } from "./brand/cats";
export { StreamText, ThinkingText, TextScramble, TextRotate, AgentSteps, ToolCallCard, PromptBar, StatusDot, VoiceBars, LiveCounter } from "./components/agent";
export type { AgentStepStatus } from "./components/agent";
export { HScroll } from "./components/hscroll";
export * from "./icons";
