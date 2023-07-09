import Image from 'next/image';

export default function Home() {
    return (
        <main>
            <div className="container ">
                <div className="text-center">
                    <h1>Bienvendio al centro artesanal</h1>
                    <Image className={'img-fluid rounded'} src={'/sources/estudiantes.jpg'} width={'1000'} height={'750'} alt='Universitarios' ></Image>
                </div>
            </div>
        </main>
    )
}