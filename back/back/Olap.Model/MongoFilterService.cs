using AutoMapper;
using MongoDB.Bson;
using MongoDB.Driver;
using Olap.Model.ModelBuilder;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Olap.Model
{
    public class MongoFilterService : BaseMongoService
    {
        public MongoFilterService(IMapper mapper, MongoClient mongoClient) : base(mapper, mongoClient)
        {
        }

        /// <summary>
        /// return filter system names that does't exist in db
        /// </summary>
        /// <param name="systemNames"></param>
        /// <returns></returns>
        public async Task<IEnumerable<string>> GetNonExistentFiltesr(IEnumerable<string> systemNames)
        {

            var filter = Builders<FilterDescription>.Filter.In(nameof(FilterDescription.CollectionName), systemNames);

            var cursor = await FilterDescriptionCollection.FindAsync(filter);
            var existedFilters = await cursor.ToListAsync();

            var nonExistenFilters = systemNames.Except(existedFilters.Select(f => f.CollectionName));

            return nonExistenFilters;
        }

        public async Task<FilterValuesCollection> LoadFilterValuesAsync(string filterSystemName)
        {
            var values = await GetFilterValuesAsync(filterSystemName);

            return new FilterValuesCollection(filterSystemName, values);
        }

        public async Task<IEnumerable<string>> CreateFiltersAsync(FilterDescriptionDto[] dtos)
        {

            var filterDescriptions = new List<FilterDescription>(dtos.Length);
            var tasks = new List<Task>(dtos.Length + 1);

            foreach (var dto in dtos)
            {
                var filterDescription = new FilterDescription { Name = dto.Name };
                var fValues = mapper.Map<IEnumerable<FilterValue>>(dto.Values);
                filterDescriptions.Add(filterDescription);
                tasks.Add(GetCollection<FilterValue>(filterDescription.CollectionName).InsertManyAsync(fValues));
            }

            tasks.Add(FilterDescriptionCollection.InsertManyAsync(filterDescriptions));

            await Task.WhenAll(tasks);

            return filterDescriptions.Select(x => x.CollectionName);
        }
    }
}
