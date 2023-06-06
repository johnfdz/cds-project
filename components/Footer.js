
export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <>
            <footer className="container-fuid">
                <div className="text-center">
                    <p>©{year}  Centro artesanal UG</p>
                </div>
            </footer>
        </>
    )
}
