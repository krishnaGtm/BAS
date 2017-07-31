using System;
using System.Security.Cryptography;
using System.Text;

namespace Enza.Common.Extensions
{
    public static class CryptoExtensions
    {
        public static string ToMd5(this string clearText, string key)
        {
            string result;
            string saltedString = string.Concat(clearText, key);
            // Encrypt this user's password information.
            using (var md5 = new MD5CryptoServiceProvider())
            {
                var originalStringBytes = Encoding.Default.GetBytes(saltedString);
                var encodedStringBytes = md5.ComputeHash(originalStringBytes);
                var sb = new StringBuilder();
                foreach (byte b in encodedStringBytes)
                {
                    sb.Append(b.ToString("x2").ToLower());
                }
                result = sb.ToString();
            }
            return result;
        }

        static TripleDES CreateDes(string key)
        {
            var md5 = new MD5CryptoServiceProvider();
            var des = new TripleDESCryptoServiceProvider
            {
                Key = md5.ComputeHash(Encoding.Unicode.GetBytes(key))
            };
            des.IV = new byte[des.BlockSize / 8];
            return des;
        }

        public static byte[] Encrypt(this string clearText, string key)
        {
            var des = CreateDes(key);
            var ct = des.CreateEncryptor();
            var input = Encoding.Unicode.GetBytes(clearText);
            return ct.TransformFinalBlock(input, 0, input.Length);
        }

        public static byte[] Decrypt(this string encText, string key)
        {
            var b = Convert.FromBase64String(encText);
            var des = CreateDes(key);
            var ct = des.CreateDecryptor();
            return ct.TransformFinalBlock(b, 0, b.Length);
        }

        public static string EncryptAsString(this string clearText, string key)
        {
            var buffer = Encrypt(clearText, key);
            return Convert.ToBase64String(buffer);
        }

        public static string DecryptAsString(this string encText, string key)
        {
            var output = Decrypt(encText, key);
            return Encoding.Unicode.GetString(output);
        }
    }
}