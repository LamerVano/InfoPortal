﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Common;

namespace DataAcces
{
    public interface IRepository<T> where T: IEntity
    {
        T GetById(int id);
        IEnumerable<T> List();
        void Add(T entity);
        void Delete(int id);
        void Edit(T entity);
    }
}
