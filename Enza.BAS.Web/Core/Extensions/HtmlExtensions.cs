using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Mvc;
using Enza.Common.Extensions;

namespace Enza.BAS.Web.Core.Extensions
{
    public static class HtmlExtensions
    {
        public static string GetAction(this HtmlHelper helper)
        {
            var result = helper.ViewBag.CAction as string;
            if (string.IsNullOrWhiteSpace(result))
                return "Create";
            return result;
        }


        public static SelectList ToSelectList<T>(this IQueryable<T> query, string dataValueField, string dataTextField,
            object selectedValue)
        {
            return new SelectList(query, dataValueField, dataTextField, selectedValue);
        }
        public static SelectList ToSelectListWithIndex<T>(this IEnumerable<T> items, Func<T, object> value,
            Func<T, object> text, int selectedIndex)
        {
            var options = items.Select(o => new SelectListItem
            {
                Text = text(o).ToText(),
                Value = value(o).ToText()
            }).ToList();

            object selectedValue = null;
            if (selectedIndex >= 0 && selectedIndex < options.Count)
            {
                var item = options[selectedIndex];
                item.Selected = true;
                selectedValue = item.Value;
            }
            return new SelectList(options, "Value", "Text", selectedValue);
        }

        public static SelectList ToSelectList<T>(this IEnumerable<T> query, Expression<Func<T, object>> value,
            Expression<Func<T, object>> text, object selectedValue = null)
        {
            var result = new SelectList(query, value.ToPropertyName(), text.ToPropertyName(), selectedValue);
            return result;
        }

        public static MultiSelectList ToMultiSelectList<T>(this IQueryable<T> query, string dataValueField,
            string dataTextField, IEnumerable<object> selectedValues)
        {
            return new MultiSelectList(query, dataValueField, dataTextField, selectedValues);
        }

        public static MultiSelectList ToMultiSelectList<T>(this IQueryable<T> query, string dataValueField,
            string dataTextField, IEnumerable<int> selectedValues)
        {
            return new MultiSelectList(query, dataValueField, dataTextField, selectedValues);
        }

        public static MultiSelectList ToMultiSelectList<T>(this IEnumerable<T> query, Expression<Func<T, object>> value,
            Expression<Func<T, object>> text, IEnumerable<int> selectedValues = null)
        {
            var result = new MultiSelectList(query, value.ToPropertyName(), text.ToPropertyName(), selectedValues);
            return result;
        }
    }
}
