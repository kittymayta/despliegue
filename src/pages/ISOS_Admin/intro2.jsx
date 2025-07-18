import { useState, useEffect, useCallback  } from "react";
import Titulo from "../../components/ISOS_Admin/titulo_intro";
import Descripcion from "../../components/ISOS_Admin/descripcion_intro";
import Video from "../../components/ISOS_Admin/video_intro";
import Imagen from "../../components/ISOS_Admin/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import useCRUD from "@/hooks/useCrud";

const Iso9000IntroAdmin = () => { 
  const iso  = 2; 
  const {get} = useCRUD();
  const [isEditing, setIsEditing]=useState(false)
  const [selectImage, setSelectedImage]=useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [isoCompleta, setIsoCompleta] = useState(null);
  const imagesPerPage = 3;


  const handleImageChange = (imagen) =>{
    setSelectedImage(imagen);
    setIsEditing(true);
  }

  // Memorizar funciones con useCallback
  const fetchIsoData = useCallback(async (iso) => {
    try {
      const response = await get(`normasIso/${iso}`);
      setIsoCompleta(response);
      console.log("Iso: ", isoCompleta);
    } catch (error) {
      console.error("Error al recuperar la ISO:", error);
    }
  }, [get]);

  const fetchImagenes = useCallback(async (iso) => {
    try {
      const response = await get(`file/obtenerImagenes/${iso}`);
      setImagenes(response);
    } catch (error) {
      console.error("Error al recuperar las imágenes:", error);
    }
  }, [get]);

  useEffect(() => {
      fetchIsoData(iso);
  }, [fetchIsoData]);

  const currentImages = images.slice(currentIndex, currentIndex + imagesPerPage);

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
      <div className="text-black w-full">
        <div className="flex flex-col justify-center items-center">
        {isoCompleta ? ( 
            <>
              <Titulo iso={isoCompleta}/>
              <Descripcion iso={isoCompleta}/>
              <Video iso={isoCompleta}/>
            </>
          ) : (
            <p>Cargando datos de la ISO...</p> 
          )}
        </div>

        <div className="my-4 flex justify-center">
        </div>
        <div className="w-full flex items-center justify-center">
          <Carousel className="w-full max-w-5xl">
            <CarouselContent className="ml-1">
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Imagen alt="Primera" imagen={image}/>
                </CarouselItem>
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Imagen alt="Segunda" imagen={image2}/>
                </CarouselItem>
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Imagen alt="Tercera" imagen={image4}/>
                </CarouselItem>
                <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Imagen alt="Cuarta" imagen={image5}/>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
  );
};

export default Iso9000IntroAdmin;