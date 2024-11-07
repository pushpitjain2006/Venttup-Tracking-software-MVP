import { useState } from "react";
import { AiOutlineDownload, AiOutlineFilePdf } from "react-icons/ai";
import { motion } from "framer-motion";

const DocumentPreview = ({ document, themeColor }) => {
  const [loading, setLoading] = useState(true);
  const isPdf = document?.url.endsWith(".pdf");
  const isImage = document?.url.match(/\.(jpeg|jpg|gif|png|webp)$/i);

  return document?.url ? (
    <div className="w-full mt-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AiOutlineFilePdf size={24} className="text-red-500" /> Document
          Preview
        </p>
      </motion.div>

      <motion.div
        className="relative w-full overflow-scroll rounded-md shadow-lg mb-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
            <div
              className={`loader animate-spin border-t-2 border-b-2 border-${themeColor}-500 w-8 h-8 rounded-full`}
            ></div>
          </div>
        )}

        {isPdf && (
          <iframe
            src={document?.url}
            title="Document Preview"
            className="w-full h-80 sm:h-96 md:h-96 object-contain"
            onLoad={() => setLoading(false)}
          ></iframe>
        )}

        {isImage && (
          <img
            src={document?.url}
            alt="Document Preview"
            className="w-full h-96 sm:h-96 md:h-96 object-contain  overflow-scroll"
            onLoad={() => setLoading(false)}
          />
        )}
      </motion.div>

      <motion.a
        href={document?.url}
        download
        className={`mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-${themeColor}-600 text-white rounded-md shadow transition-all duration-300 ease-in-out hover:bg-${themeColor}-800 w-full sm:w-auto`}
        whileHover={{ scale: 1.05 }}
      >
        <AiOutlineDownload size={20} />
        Download
      </motion.a>
    </div>
  ) : null;
};

export default DocumentPreview;
