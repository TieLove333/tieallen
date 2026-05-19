"use client";

import Link from "next/link";
import styles from "./button.module.css";

function ArrowIcon({ direction = "top-right" }: { direction?: "top-right" | "down" }) {
  if (direction === "down") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

type ButtonBaseProps = {
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "dark" | "light";
  color?: string;
  textColor?: string;
  className?: string;
  icon?: "top-right" | "down";
  target?: string;
};

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonActionProps = ButtonBaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

type ButtonProps = ButtonLinkProps | ButtonActionProps;

export default function Button({
  label,
  href,
  target,
  onClick,
  type = "button",
  disabled,
  size = "md",
  variant = "default",
  color,
  textColor,
  className = "",
  icon = "top-right",
}: ButtonProps) {
  const sizeClass = size === "lg" ? styles.sizeLg : size === "sm" ? styles.sizeSm : styles.sizeMd;
  const variantClass =
    variant === "dark"
      ? styles.variantDark
      : variant === "light"
      ? styles.variantLight
      : styles.variantDefault;

  const inlineVars = {
    ...(color ? { backgroundColor: color, backgroundImage: "none" } : {}),
    ...(textColor ? { color: textColor } : {}),
  } as React.CSSProperties;

  const sharedClass = `${styles.buttonWrapper} ${sizeClass} ${variantClass} ${className}`.trim();
  const iconClass = icon === "down" ? `${styles.icon} ${styles.iconDown}` : styles.icon;

  const inner = (
    <>
      <span>{label}</span>
      <span className={iconClass}>
        <ArrowIcon direction={icon} />
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} target={target} className={sharedClass} style={inlineVars}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={sharedClass}
      style={inlineVars}
    >
      {inner}
    </button>
  );
}
