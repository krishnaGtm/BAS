using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Enza.Common.Extensions
{
    public static class CommonExtensions
    {
        public static T CloneAs<T>(this object source) where T : class, new()
        {
            if (source.IsNull()) return default(T);

            var result = new T();
            const BindingFlags flags = (BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
            var targetType = result.GetType();
            var sourceProps = source.GetType().GetProperties(flags);
            foreach (var property in sourceProps)
            {
                var targetProperty = targetType.GetProperty(property.Name, flags);
                if (targetProperty != null && targetProperty.CanWrite &&
                    targetProperty.PropertyType.IsAssignableFrom(property.PropertyType))
                {
                    var value = property.GetValue(source, null);
                    targetProperty.SetValue(result, value, null);
                }
            }
            return result;
        }

        public static bool IsNull(this object obj)
        {
            return (obj == null || obj == DBNull.Value);
        }

        public static string ToText(this object o)
        {
            if (o == null || o == DBNull.Value)
            {
                return string.Empty;
            }
            return o.ToString();
        }

        public static int ToInt32(this object o)
        {
            if (o.IsNull())
            {
                return 0;
            }
            return Convert.ToInt32(o);
        }

        public static bool ToBoolean(this object o)
        {
            if (o.IsNull())
            {
                return false;
            }
            return Convert.ToBoolean(o);
        }

        public static bool EqualsIgnoreCase(this object val1, object val2)
        {
            return string.Compare(val1.ToText(), val2.ToText(), StringComparison.OrdinalIgnoreCase) == 0;



        }

        public static bool IsNumeric(this object value)
        {
            if (value.IsNull()) return false;

            double result;
            return double.TryParse(Convert.ToString(value), System.Globalization.NumberStyles.Any,
                System.Globalization.NumberFormatInfo.InvariantInfo, out result);
        }

        public static Exception GetException(this Exception ex)
        {
            var innerEx = ex;
            while (innerEx.InnerException != null)
            {
                innerEx = innerEx.InnerException;
            }
            return innerEx;
        }

        public static string ToPropertyName<T>(this Expression<Func<T, object>> expression)
        {
            var body = expression.Body as MemberExpression ??
                       ((UnaryExpression)expression.Body).Operand as MemberExpression;
            if (body != null)
            {
                return body.Member.Name;
            }
            return string.Empty;
        }

        public static string ToPropertyName<T, TResult>(this Expression<Func<T, TResult>> expression)
        {
            var body = expression.Body as MemberExpression ?? ((UnaryExpression)expression.Body).Operand as MemberExpression;
            if (body != null)
            {
                return body.Member.Name;
            }
            return string.Empty;
        }

        public static string ToJson(this object o, bool camelCase = false)
        {
            if (o == null || o == DBNull.Value)
            {
                return string.Empty;
            }
            if (camelCase)
            {
                var settings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };
                return JsonConvert.SerializeObject(o, settings);
            }
            return JsonConvert.SerializeObject(o);
        }

        public static TValue GetValue<TEntity, TValue>(this TEntity entity, Func<TEntity, TValue> expression)
        {
            if (entity == null)
            {
                return default(TValue);
            }
            return expression(entity);
        }

        public static TValue GetValue<TEntity, TValue>(this IEnumerable<TEntity> source, int index, Func<TEntity, TValue> expression)
        {
            if (source == null)
            {
                return default(TValue);
            }
            var items = source.ToList();
            if (index > items.Count - 1)
            {
                return default(TValue);
            }
            var entity = items[index];
            return expression(entity);
        }
    }
}