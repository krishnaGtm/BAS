using System.IO;
using Ionic.Zlib;

namespace Enza.Common.Extensions
{
    public static class ZipExtensions
    {
        public static byte[] Zip(this byte[] bytes)
        {
            if (bytes == null) return null;
            using (var output = new MemoryStream())
            {
                using (var compressor = new GZipStream(output, CompressionMode.Compress, CompressionLevel.BestSpeed))
                {
                    compressor.Write(bytes, 0, bytes.Length);
                }
                return output.ToArray();
            }
        }

        public static byte[] Deflate(this byte[] bytes)
        {
            if (bytes == null) return null;
            using (var output = new MemoryStream())
            {
                using (var compressor = new DeflateStream(output, CompressionMode.Compress, CompressionLevel.BestSpeed))
                {
                    compressor.Write(bytes, 0, bytes.Length);
                }
                return output.ToArray();
            }
        }
    }
}
