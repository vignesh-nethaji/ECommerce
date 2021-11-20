using ECommerce.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Services.Interfaces
{
    public interface IAccountService
    {
        Task<AuthenticateResponse> Login(AuthenticateRequest model);
    }
}
