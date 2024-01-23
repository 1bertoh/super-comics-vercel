/**
 * 
 * @param {{children:JSX, gradientDirecton: 'white-to-black' | 'black-to-white'}} param0 
 * @returns 
 */
export const SSection = ({children, gradientDirecton='white-to-black'}) => {
    return (
        <section
            style={{
                background:
                    gradientDirecton === "white-to-black"
                        ? "linear-gradient(180deg, rgba(80, 117, 189, 0.51) 44.5%, rgba(8, 21, 46, 0.51) 99.71%)"
                        : "linear-gradient(0deg, rgba(80, 117, 189, 0.51) 44.5%, rgba(8, 21, 46, 0.51) 99.71%)",
            }}
            className="section pb-10 py-5"
        >
            {children}
        </section>
    );
}