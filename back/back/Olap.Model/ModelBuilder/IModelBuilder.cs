using System.Threading.Tasks;

namespace Olap.Model.ModelBuilder
{
    public interface IModelBuilder
    {
        Task<string> CreateModelAsync(IModelDescription modelDescription);
    }
}