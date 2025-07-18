import { useState, useEffect } from "react";
import useCRUD from "@/hooks/useCrud";
import { toast } from "sonner";
import Image from 'next/image';

const VideoIntro = ({ iso }) => {
  const [isVideoEditing, setIsVideoEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [tempVideoUrl, setTempVideoUrl] = useState(videoUrl);
  const { get, post } = useCRUD();

  useEffect(() => {
    if (iso.linkVideo) {
      setVideoUrl(transformVideoUrl(iso.linkVideo));
      setTempVideoUrl(transformVideoUrl(iso.linkVideo));
      console.log(iso.linkVideo);
    }
  }, [iso.linkVideo]);

  const handleEditClick = () => {
    setIsVideoEditing(true);
  };

  const handleSaveClick = async () => {
    setVideoUrl(transformVideoUrl(tempVideoUrl));
    setIsVideoEditing(false);
    const data = {
      nombreNormaIso: iso.nombreNormaIso,
      descripcionNormaIso: iso.descripcionNormaIso,
      linkVideo: tempVideoUrl,
      nombreVideo: iso.nombreVideo,
    };
    try {
      await post(`normasIso/update/${iso.codigoNormaIso}`, data);
      toast.success("Video cargado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al cargar el video");
    }
  };

  const handleCancelClick = () => {
    setIsVideoEditing(false);
  };

  const transformVideoUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  return (
    <div className="flex flex-col items-center mb-4 px-4 sm:px-6">
      {/* Sección principal con lógica de edición y vista previa del video */}
      <div className="flex items-center w-full justify-center">
        {isVideoEditing ? (
          <input
            type="text"
            value={tempVideoUrl}
            onChange={(e) => setTempVideoUrl(e.target.value)}
            placeholder="Ingresa el enlace del video de YouTube"
            className="w-full border border-gray-300 rounded px-2 py-1 ml-2"
          />
        ) : (
          <>
            <button onClick={handleEditClick} className="mr-2">
              <Image
                src="/images/icono_editar.png"
                alt="editar"
                className="w-6 h-6 sm:w-9 sm:h-8"
                width={500}
                height={500}
              />
            </button>
            {videoUrl && (
              <div className="w-full sm:w-[560px] md:w-[640px] aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </>
        )}
      </div>

      {/* Botones para edición */}
      {isVideoEditing && (
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            onClick={handleCancelClick}
          >
            Cancelar
          </button>
          <button
            className="bg-custom-blue text-white py-2 px-4 rounded-lg hover:bg-red-700"
            onClick={handleSaveClick}
          >
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoIntro;