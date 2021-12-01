using ECommerce.Models;
using ECommerce.Repository.Interfaces;
using ECommerce.Repository.Migrations;
using ECommerce.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Services.Implementation
{
    public class ProductService : IProductService, IDisposable
    {
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public void Dispose()
        {
            _productRepository.Dispose();
        }

        public async Task<List<Product>> GetAll()
        {
            return await _productRepository.GetAll();
        }

        public async Task<Product> Get(int id)
        {
            return await _productRepository.GetById(id);
        }
        public async Task<List<Product>> GetProductByCategory(int categoryId)
        {
            var data = (await _productRepository.GetAll()).Where(o => o.CategoryId == categoryId).ToList();
            return data;
        }

        public async Task<Product> Insert(Product Product)
        {
            return await _productRepository.Insert(Product);
        }

        public async Task<Product> Update(Product Product)
        {
            return await _productRepository.Update(Product);
        }

        public async Task Delete(int id)
        {
            await _productRepository.Delete(id);
        }

    }
}




