import gif from "../../../src/assets/gif.gif"

export default function Home() {
    return (
        <>
            <div className="text-center mb-3">
                <h1 className="py-1">Surveys</h1>
                <p>Ask your questions! Create your own surveys, or fill out others'!</p>
            </div>
            <div className="d-flex my-5">
                <a href="https://www.youtube.com/watch?v=cPJUBQd-PNM" target="_blank" className="mx-auto"><img src={gif} alt="Creeper... oooo maaan" className="img-fluid" style={{maxHeight: "17em"}}/></a>
            </div>
        </>
    )
}