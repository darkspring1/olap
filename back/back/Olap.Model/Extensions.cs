using System.Data.Common;

namespace Olap.Model
{
    public static class Extensions
    {
        public static T GetFieldValue<T>(this DbDataReader reader, string name)
        {
            var ordinal = reader.GetOrdinal(name);
            return reader.GetFieldValue<T>(ordinal);
        }
    }
}
