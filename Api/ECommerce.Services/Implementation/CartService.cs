using ECommerce.Models;
using ECommerce.Repository.Interfaces;
using ECommerce.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Services.Implementation
{
    public class CartService : ICartService, IDisposable
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        public CartService(ICartRepository cartRepository, IProductRepository productRepository)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }

        public void Dispose()
        {
            _cartRepository.Dispose();
            _productRepository.Dispose();
        }

        public async Task<List<Cart>> GetAll()
        {
            return await _cartRepository.GetAll();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Cart> Get(int id)
        {
            return await _cartRepository.GetById(id);
        }

        public async Task<Cart> Insert(Cart cart)
        {
            return await _cartRepository.Insert(cart);
        }

        public async Task<Cart> Update(Cart cart)
        {
            return await _cartRepository.Update(cart);
        }

        public async Task Delete(int id)
        {
            await _cartRepository.Delete(id);
        }


        public async Task<List<Product>> GetProducts(int userId)
        {
            var productIds = (await _cartRepository.GetAll()).Where(o => o.UserId == userId).Select(o => o.ProductId);
            var products = (await _productRepository.GetAll()).Where(o => productIds.Contains(o.Id)).ToList();
            return products;
        }
    }

}
