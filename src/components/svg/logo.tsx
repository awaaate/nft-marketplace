export interface LogoProps {
    fill?: string;
}

export const Logo: React.FC<LogoProps> = ({ fill = "white" }) => {
    return (
        <svg
            width="27"
            height="28"
            viewBox="0 0 27 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="13.3759"
                cy="14.0968"
                r="11.8165"
                stroke="currentColor"
                stroke-width="3.11892"
            ></circle>
            <path
                d="M1.57373 15.0804C2.11555 11.9632 5.05081 7.59909 12.4573 15.0804C19.8637 22.5617 24.024 18.1976 25.1783 15.0804"
                stroke="currentColor"
                stroke-width="2.75387"
                stroke-linecap="round"
            ></path>
        </svg>
    );
};
