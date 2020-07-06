using Microsoft.AspNetCore.SignalR;
using POC.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POC.Api.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(Message msg)
        {
            await Clients.All.SendAsync("MessageReceived", msg);
        }
    }
}
