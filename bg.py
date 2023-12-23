import pygame
import sys
import time
import ctypes

ctypes.windll.user32.SetProcessDPIAware()
# 初始化 Pygame
pygame.init()

# 設定視窗大小
window_size = (1200, 690)
screen = pygame.display.set_mode(window_size)
pygame.display.set_caption("Pygame Image")

# 載入圖片
path = "C:\\DOSM\\img\\"
bg = pygame.image.load(path + "bg.png")
def load_images():
    images = ["cherry.png", "lemon.png", "plum.png", "orange.png",
            "bell.png", "bar.png"]
    images = [pygame.image.load(path + img) for img in images]
    return images

images = load_images() 


# 取得圖片的位置和大小
image_rect = bg.get_rect()
# 設定視窗的中心點為圖片的中心點
screen_rect = screen.get_rect()
image_rect.center = screen_rect.center
"""
def image_position(image,x,y):
    image_rect = image.get_rect()
    image_rect.topleft = (x, y)"""

move = 69 # 設定轉動速度

# 主迴

clock = pygame.time.Clock()
play = False

hide_height = 0 #最後隱藏
cur_image = 0
image = images[0]
x, y = 0,0 # 設定圖片的初始位置

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    if y < 69:
        y += move
    else:
        hide_height += move 
        """if not play:
        for j in range(6):
            screen.fill((255, 255, 255)) 
            screen.blit(bg, image_rect)
            for i in range(6):      
                screen.blit(images[abs(j - i)],(40 + 240 * i,40)) 
                screen.blit(images[abs(j - i)],(40 + 240 * i,40+230))
                screen.blit(images[abs(j - i)],(40 + 240 * i,40+230*2))
            clock.tick(2)
            pygame.display.flip()"""

    screen.fill((255, 255, 255))
    screen.blit(bg, image_rect)
    for i in range(3):
        clock.tick(120) 
        if  y <= 2:             
            top_clip_rect = pygame.Rect(0,60 - (y) * 30, #顯示速度
                                150 ,150)
            #screen.blit(image,(40 ,40+230*i),top_clip_rect) 
            screen.blit(image,(40,40+230*i)) 
            #screen.blit(image,(40 ,40+230*i),top_clip_rect) 
        else:                                         
            bottom_clip_rect = pygame.Rect(0,-hide_height * 0.5, #消失 
                        150 , 150)
            #screen.blit(image,(40,40+230*i),bottom_clip_rect)
            screen.blit(image,(40,40+230*i))
            #screen.blit(image,(40,40+230*i),bottom_clip_rect)
            if hide_height >= 150:
                cur_image += 1
                if cur_image % 5 == 0:
                    cur_image = 0
                y = 0
                hide_height = 0
                image = images[cur_image]
    
    # 更新畫面
    pygame.display.flip()

# 結束 Pygame
pygame.quit()
