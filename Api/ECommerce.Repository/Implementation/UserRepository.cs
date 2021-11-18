using ECommerce.Models;
using ECommerce.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Repository.Implementation
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(ECommerceContext context) : base(context)
        {

        }
    }
}
