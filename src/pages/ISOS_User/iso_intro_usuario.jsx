import Carrusel from "../../components/ISOS_User/carrusel";
import { useState, useEffect, useCallback  } from "react";
import { useRouter } from "next/router";
import useCRUD from "@/hooks/useCrud";
import Image from "../../components/ISOS_Admin/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"


const IsoIntroUsuarios = () => {
  const {get}=useCRUD();
  const iso = 1; 
  const [videoUrl, setVideoUrl] = useState('');
  const [norma, setNorma] = useState({});
  const [imagenes, setImagenes] = useState([]);


  const transformVideoUrl = (url) => { 
    if (!url) {
      console.log("El url es undefined: ", url)
      return ''; 
    }
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  // Memorizar la función fetchIsoData con useCallback
  const fetchIsoData = useCallback(async (iso) => {
    try {
      const response = await get(`normasIso/${iso}`);
      setNorma(response);

      if (response.linkVideo) {
        setVideoUrl(transformVideoUrl(response.linkVideo));
      } else {
        console.warn("El enlace de video no está disponible en la respuesta.");
        setVideoUrl('');
      }
    } catch (error) {
      console.error("Error al recuperar la ISO:", error);
    }
  }, [get]);

  // Memorizar la función fetchImages con useCallback
  const fetchImages = useCallback(async (iso) => {
    try {
      const response = await get(`file/obtenerImagenes/${iso}`);
      setImagenes(response);
    } catch (error) {
      console.error("Error al recuperar la ISO:", error);
    }
  }, [get]);

  // Ejecutar los datos ISO y las imágenes solo cuando el parámetro `iso` cambie
  useEffect(() => {
    if (iso) {
      console.log("Iso a buscar: ", iso);
      fetchIsoData(iso);
      fetchImages(iso);
    }
  }, [iso, fetchIsoData, fetchImages]);


  const image = {
    link: "/images/ejemplo1.jpg",
    descripcion: "Reuniones Matutinas",
  }
  const image2 = {
    link: "/images/ejemplo2.jpeg",
    descripcion: "Nuestro Equipo",
  }
  const image4 = {
    link: "/images/ejemplo4.jpeg",
    descripcion: "Conferencias",
  }
  const image5 = {
    link: "/images/ejemplo5.jpg",
    descripcion: "Auditorias",
  }


  return (
      <div className="text-black px-4 w-full">
        <h1 className="text-3xl font-bold text-center mt-4">{norma.nombreNormaIso}</h1>
        <br />
        <div className="ml-28 mr-28">
          <p className="text-justify mt-2 font-montserrat whitespace-pre-line" style={{ textIndent: '2em' }}>
            {norma.descripcionNormaIso}<br /><br />
          </p>
        </div>
        
        {/* Video 560x315*/}
        <div className="flex justify-center my-6">
          <iframe
            width="560"
            height="315"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
          <Carousel className="w-full max-w-5xl">
            <CarouselContent className="ml-1">
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Image alt="Primera" imagen={image}/>
                </CarouselItem>
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Image alt="Segunda" imagen={image2}/>
                </CarouselItem>
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Image alt="Tercera" imagen={image4}/>
                </CarouselItem>
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Image alt="Cuarta" imagen={image5}/>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
  );
};

export default IsoIntroUsuarios;