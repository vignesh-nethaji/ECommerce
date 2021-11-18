using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Models.ViewModels
{
    public class ResponseData<T>
    {
        public string Message { get; set; }
        public T Data { get; set; }
    }
}
