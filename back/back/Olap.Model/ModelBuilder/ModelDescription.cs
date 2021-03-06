﻿using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Olap.Model.ModelBuilder
{

    public class ModelDescription
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string CellCollection { get; set; }
    }


    public class ModelDescriptionDto
    {
        public string Name { get; set; }
        public ViewDto DefaultView { get; set; }
    }


    public class ModelDescriptionResponceDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<ViewDto> Views { get; set; }
    }
}