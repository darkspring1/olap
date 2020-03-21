using System.Collections.Generic;

namespace Olap.WebApi
{
    public class ApiError
    {
        public ApiError(int code, string message)
        {
            Code = code;
            Message = message;
        }

        public string Message { get; }
        public int Code { get; }
    }

    public static class Errors
    {
        public static ApiError FiltersAreNonExisten(IEnumerable<string> systemNames)
        {
            return new ApiError(1, $"This filters are nonexistens: {string.Join(", ", systemNames)}");
        }

        public static ApiError Required(string requiredParamName)
        {
            return new ApiError(2, $"{requiredParamName} is required.");
        }
    }
}
