export const SMain = (props) => {
    const {children} = props;
    return(
        <main
              className="flex min-h-screen flex-col items-center justify-between sm:p-24 pt-24 py-3"
              style={{ height: "150vh" }}
          >
            {children}
          </main>
    )
}