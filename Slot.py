import pygame
import sys
import time


# 初始化 Pygame
pygame.init()

# 設定視窗寬度和高度
window_width = 800
window_height = 600

# 定義拉霸機圓盤的符號
path = "C:\\DOSM\\img\\"
symbols = [path + "cherry.png", path + "lemon.png", path + "plum.png", path + "bell.png", path + "bar.png"]

# 建立視窗
screen = pygame.display.set_mode((window_width, window_height))
pygame.display.set_caption("Clipping Example")

image = pygame.image.load(symbols[0]) # 載入圖片
x, y = 0,0 # 設定圖片的初始位置
move = 69 # 設定轉動速度    0.5 1 3 5 

hide_height = 0 #最後隱藏
limit = 150     #照片高度

# 主迴圈
running = True
paused = False

#當前照片
cur_image = 0

count = True
while running:  
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                # 切换暂停状态
                paused = not paused
    if not paused:  
        if  y < 200:
            y += move
        else:
            hide_height += move 

        # 清除畫面
        screen.fill((255, 255, 255))
        if  y <= 2:             #20平滑
            top_clip_rect = pygame.Rect(0,60 - (y) * 30, #顯示速度
                                150 ,150)
            screen.blit(image,(50 , 50 + y),top_clip_rect) 
            screen.blit(image,(250 , 50 + y),top_clip_rect) 
            screen.blit(image,(450 , 50 + y + move),top_clip_rect) 
        else:                                           #0.2平滑
            bottom_clip_rect = pygame.Rect(0,-hide_height * 0.5, #消失 
                        150 , 150)
            screen.blit(image,(50 ,50 + y),bottom_clip_rect)
            screen.blit(image,(250 ,50 + y),bottom_clip_rect)
            screen.blit(image,(450 ,50 + y),bottom_clip_rect)
            if hide_height >= 150:
                cur_image += 1
                if cur_image % 5 == 0:
                    cur_image = 0
                y = 0
                hide_height = 0
                image = pygame.image.load(symbols[cur_image])

        # 更新視窗
        pygame.display.flip()

# 關閉 Pygame
pygame.quit()
sys.exit()
