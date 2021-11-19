using ECommerce.Models;
using ECommerce.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Repository.Implementation
{
    public class CartRepository : BaseRepository<Cart>, ICartRepository
    {
        public CartRepository(ECommerceContext Context) : base(Context)
        {

        }
    }

}
