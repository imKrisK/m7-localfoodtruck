import React from 'react';

/**
 * Reusable Button component with support for loading, icons, and custom styles.
 * @param {string} type - The button type (button, submit, etc.)
 * @param {React.ReactNode} children - Button content
 * @param {function} onClick - Click handler
 * @param {boolean} loading - Show loading spinner if true
 * @param {React.ReactNode} icon - Optional icon to display
 * @param {object} style - Custom styles
 * @param {string} className - Custom className
 * @param {boolean} disabled - Disable the button
 */
const Button = ({
  type = 'button',
  children,
  onClick,
  loading = false,
  icon,
  style = {},
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: '0.5rem 1.5rem',
        borderRadius: '4px',
        border: 'none',
        background: '#007BFF',
        color: '#fff',
        fontSize: '1rem',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.6 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        ...style,
      }}
      className={className}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="button-spinner" style={{ marginRight: 6 }}>
          <svg width="16" height="16" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#fff" strokeWidth="5" strokeDasharray="90,150" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        </span>
      )}
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;